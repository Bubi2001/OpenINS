# Benchmarks

## A. Performance

### Execution Time (microseconds)

* **How:** Use a dedicated timer (or the M33's cycle counter) to precisely measure the wall-clock time in microseconds for a single `predict()` step and a single `update()` step for each variant.
* **Why:** This is the most important metric. It directly answers the "throughput" part of your float vs. double comparison and shows the overhead of UKF vs. EKF.

### Max Achievable Filter Rate (Hz)

* **How:** This is a calculated value: `1,000,000 / (Execution Time in µs)`.
* **Why:** It's an intuitive way to present the data (e.g., "The CMSIS-float variant can run at 400 Hz, while the Eigen-double-UKF can only run at 50 Hz").

## B. Accuracy

### Root Mean Square Error (RMSE)

* **How:** This is the hardest part. You need a "ground truth."
  1. **Static Test:** Leave the board perfectly still for 10 minutes. The ground truth for yaw, pitch, and roll is 0°/s angular velocity.
  2. **Dynamic Test:** Mount the board to a known-good reference (e.g., a professional, non-RTK INS) or move it in a very specific, repeatable pattern (e.g., a 90° turn on a turntable).
* **Why:** RMSE is the standard academic way to measure the accuracy of a filter. You'll have RMSE for `roll (deg)`, `pitch (deg)`, `yaw (deg)`, `position (m)`, and `velocity (m/s)`.

### Yaw Drift (deg/min)

* **How:** For the magnetometer variants, run the static test and measure how far the yaw reading drifts over time, *especially* after being exposed to a magnetic disturbance (like a piece of metal).
* **Why:** This directly tests the magnetometer's vulnerability vs. the rock-solid nature of the dual-GNSS yaw.

## C. Numerical Stability

### Filter Divergence (Time-to-Failure)

* **How:** Run an extended "torture test" (e.g., 1 hour long) with realistic, noisy data. Monitor the covariance `P` matrix. A "failure" is when any diagonal value of `P` either goes to infinity (blows up) or becomes negative (a mathematical impossibility).
* **Why:** This is the *entire point* of the Joseph form and double-precision. You are trying to find which variants fail, and which ones (like your "Gold Standard" Eigen-double-Joseph) are immortal.

## D. Resource Cost

### Code Size (Flash Usage) in KB

* **How:** Check the `.map` file after compiling each variant.
* **Why:** Shows the cost of C++ templates, Eigen, and the UKF algorithm in terms of non-volatile memory.

### Memory Usage (SRAM Usage) in KB

* **How:** Check the `.map` file for static/BSS usage, and measure the max heap usage at runtime.
* **Why:** Shows the memory pressure of each variant (e.g., `P` matrix in double vs. float).

---

## Data delivery

A massive dataset of 30 variants needs a clear and impactful delivery.

1. **The "Big Table":** Create a large, single comparison table in your MkDocs.
   * **Rows:** Each of the 30 KF variants.
   * **Columns:** All the key metrics (Execution Time, Max Hz, RMSE, Stability, Code Size, SRAM).
   * Use color-coding (e.g., red-yellow-green) to highlight the best and worst performers in each column.
2. **Radar Charts (Spider Plots):** This is the most powerful "at-a-glance" visual.
   * Create a few plots that compare key "contenders."
   * **Example Plot:** "Performance vs. Accuracy Shootout"
     * **Axes:** `Max Hz (higher is better)`, `RMSE (lower is better)`, `Stability (higher is better)`, `SRAM (lower is better)`.
     * **Lines:** Plot 4 variants:
       1. `Fastest:` (e.g., EKF-Standard-Float)
       2. `Most Accurate:` (e.g., UKF-Double-GNSS)
       3. `Most Stable:` (e.g., EKF-Joseph-Double-GNSS)
       4. `Balanced:` (e.g., EKF-Joseph-Float-GNSS)
3. **Time-Series Plots:**
   * Show a 30-second snapshot from a dynamic test.
   * Plot the **Ground Truth (Yaw)** as a black line.
   * Overlay the **Magnetometer-Yaw (EKF)** in red (showing noise/drift).
   * Overlay the **Dual-GNSS-Yaw (EKF)** in blue (showing it perfectly tracking the truth).
   * This single plot will be the "money shot" that proves the value of the entire project.
4. **Raw Data:** As you are an open-source project, provide a link to the raw CSV/log files from your tests. This allows others to replicate your findings and builds immense credibility.
