# OpenINS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/Bubi2001/OpenINS/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Bubi2001/OpenINS/actions/workflows/ci.yml)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Bubi2001/OpenINS)](https://github.com/Bubi2001/OpenINS/releases)
[![GitHub last commit](https://img.shields.io/github/last-commit/Bubi2001/OpenINS)](https://github.com/Bubi2001/OpenINS/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/Bubi2001/OpenINS)](https://github.com/Bubi2001/OpenINS)
[![GitHub contributors](https://img.shields.io/github/contributors/Bubi2001/OpenINS)](https://github.com/Bubi2001/OpenINS/graphs/contributors)

> OpenINS is an open-source Inertial Navigation System (INS) project that serves as a complete reference guide for designing and building your own high-performance sensor fusion platform. This repository documents the entire engineering process, from advanced RF PCB design and simulation to firmware development and physical verification.

The design focuses on the implementation of the RF design to add an active antena (via u.FL connector) for the GPS module and a Meandered Inverted-F Antenna (MIFA) for the wireless communications. The firmware on the RP2354B will be implemented using its official SDK and the goal is to perform an Extended Kalman Filter to fuse data from all the sensors to get accurate inertial navigation data. The firmware on the ESP32C6 will be implemented using ESP-IDF and the goal is to communicate wirelessly the fused data.

## 🌟 Key Features

- **Hardware**:

  - Custom 4-layer PCB designed in KiCAD.
  - Impedance-controlled trace for the GPS active antenna.
  - Integrated Bias-T circuit to power the external LNA of the GPS antenna.
  - On-board impedance-matched trace antenna for the ESP32's Wi-Fi/Bluetooth.
  - Careful component placement and layout for optimal signal integrity.
  - Contains a NEO M9N GPS module.
  - Contains a xx Inertial Measurement Unit.
  - Contains a xx Barometer.
  - Contains a RP2354B for Sensor Fusion algorithms
  - Contains a ESP32C6 for Wireless Communication
- **Firmware**:

  - Powered by an ESP32-S3/C6 for high performance and wireless connectivity.
  - Advanced sensor fusion using an Extended Kalman Filter (EKF).
  - Modular software architecture using the `plànols` repository as a git submodule for core drivers and math libraries.
  - Wireless data streaming of fused orientation and position data.
- **Complete Workflow**:

  - RF sections (antennas, filters) simulated using **OpenEMS** and **Octave**.
  - Real-world performance validated with a Vector Network Analyzer (VNA) and spectrum analyzer.

## ⚙️ System Block Diagram

![System Block Diagram](docs/assets/system_block_diagram.svg)

## 🗂️ Repository Structure

This repository is organized to make finding information as easy as possible:

```file
OpenINS/
├── hardware/              # KiCAD project, manufacturing files, assets
├── firmware/              # Source code
├── simulations/           # OpenEMS and Octave simulation files
├── physical_verification/ # VNA measurements and other lab results
├── docs/                  # Datasheets and detailed documentation
└── README.md              # You are here!
```

## 🚀 Getting Started

Follow these steps to replicate the project.

### Prerequisites

- **Software**: KiCAD (v9.0+), Visual Studio Code IDE with `Raspberry Pi Pico` and `ESP-IDF` extensions, OpenEMS, Octave, Python.
- **Hardware**: See the Bill of Materials (BOM) in the `hardware/manufacturing/` folder.

### Hardware Assembly

1. Generate the Gerbers from the KiCAD project located in `hardware/kicad/`.
2. Order the PCB from your preferred manufacturer.
3. Source the components listed in the BOM.
4. Solder the components to the PCB. Pay close attention to the orientation of the ICs.

<!---
### Firmware Setup

1. Clone this repository, making sure to include the git submodules:

    ```bash
      git clone --recurse-submodules [https://github.com/Bubi2001/OpenINS.git](https://github.com/Bubi2001/OpenINS.git)
    ```

2. Open the `firmware/` directory in PlatformIO.
3. Build the project.
4. Upload the firmware to the ESP32.
--->

## 🔬 Simulation and Verification

This project emphasizes the importance of validating design choices.

- The `simulations/` folder contains the scripts and files used to model the RF performance before manufacturing.
- The `physical_verification/` folder contains exported data from lab equipment, showing how the real-world hardware compares to the simulations.

## 🗺️ Roadmap

### **Phase 1: Research & Component Selection**

- [ ] **Define Performance Goals**: Finalize the target accuracy, update rate (Hz), and power consumption.
- [X] **GNSS Module Selection**: Select a GPS/GNSS module. Module selected is NEO M9N GPS.
- [ ] **IMU Selection**: Compare and choose an Inertial Measurement Unit based on noise, stability, and power features.
- [ ] **Barometer Selection**: Choose a high-precision barometer for altitude stabilization.
- [X] **MCU Selection**: Lock in the final microcontroller selection. Selected MCUs are RP2354B for processing and ESP32C6 for communication.

### **Phase 2: Hardware Design & Simulation**

- [ ]  **Schematic Design**: Create the full circuit schematic in KiCAD, including power management and programming interface.
- [ ]  **PCB Layout**: Design the 4-layer PCB layout, focusing on RF best practices (uninterrupted ground planes, controlled impedance routing, antenna clearance).
- [ ]  **RF Simulation**: Simulate the ESP32's trace antenna and the GPS bias-tee filter using OpenEMS and Octave to validate the design before manufacturing.
- [ ]  **Design Review**: Final check of the layout, footprints, and connections.
- [ ]  **Generate Manufacturing Files**: Create the final Gerbers, BoM, and Pick-and-Place files.

### **Phase 3: Firmware Development**

- [ ]  **Initial Setup**: Create the firmware project the relevant toolchains.
- [ ]  **Sensor Drivers**: Write and test the code to read raw data from the selected IMU, GNSS, and barometer.
- [ ]  **Implement EKF**: Port or develop the Extended Kalman Filter algorithm for sensor fusion.
- [ ]  **Calibration Routine**: Develop a robust calibration routine for the accelerometer, gyroscope, and magnetometer.
- [ ]  **Wireless Interface**: Implement the code to stream the fused data (quaternions, Euler angles, position) over Wi-Fi or Bluetooth.

### **Phase 4: Prototyping & Verification**

- [ ]  **Order & Assemble**: Order the first batch of PCBs and assemble the first prototype.
- [ ]  **Physical Verification**: Use a VNA to test the impedance of the antennas and filters, comparing the results with the simulations.
- [ ]  **Testing & Debugging**: Flash the firmware and perform real-world tests to fine-tune the filter and validate performance.

### **Phase 5: Final Touches & Documentation**

- [ ]  **Data Visualizer**: Create a simple Python script or web-based dashboard to visualize the orientation and position data in real-time.
- [ ]  **Enclosure Design**: Design and 3D-print a custom enclosure for the device.
- [ ]  **Finalize Documentation**: Complete the `README.md` and write detailed guides in the `/docs` folder.

## 🤝 Contributing

Contributions are welcome! If you have an idea for an improvement or find a bug, please open an issue or submit a pull request. See the [CONTRIBUTING](CONTRIBUTING.md) and [CODE OF CONDUCT](CODE_OF_CONDUCT.md) files

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
