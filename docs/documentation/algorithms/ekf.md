# Extended Kalman Filter

## Loosely-Coupled EKF

## Tightly-Coupled EKF Euler Angles

### System Model

The goal of the INS is to estimate the system's position, velocity, and attitude. A common and robust approach is to create a 15-state vector that also includes the biases of the accelerometer and gyroscope, which the filter will estimate and correct for in real-time.

#### State Vector ($x$)

The state vector $x \in \mathbb{R}^{15}$ contains the core navigation variables and sensor biases:

$$
x = \begin{bmatrix} p \\ v \\ \epsilon \\ b_a \\ b_g \end{bmatrix} = \begin{bmatrix} p_n \\ p_e \\ p_d \\ v_n \\ v_e \\ v_d \\ \phi \\ \theta \\ \psi \\ b_{ax} \\ b_{ay} \\ b_{az} \\ b_{gx} \\ b_{gy} \\ b_{gz} \end{bmatrix}
$$

Where:

$p=\begin{bmatrix} p_n & p_e &p_d \end{bmatrix}^T$: Position in a local navigation frame (North, East, Down).

$v=\begin{bmatrix} v_n & v_e & v_d \end{bmatrix}^T$: Velocity in the same navigation frame.

$\epsilon=\begin{bmatrix} \phi & \theta & \psi \end{bmatrix}^T$: Attitude as Euler Angles (roll, pitch, yaw respectively).

$b_a=\begin{bmatrix} b_{ax} & b_{ay} & b_{az} \end{bmatrix}^T$: Accelerometer biases.

$b_g=\begin{bmatrix} b_{gx} & b_{gy} & b_{gz} \end{bmatrix}^T$: Gyroscope biases.

#### Input Vector ($u$)

$\hat{x}^-_k$

$$
\dot{x} = f(x,u) = \begin{bmatrix} v \\ C_b^n(a_{im}-b_a)-g \\ E(\epsilon)(\omega_{im}-b_g) \\ 0 \\ 0 \end{bmatrix}
$$

## Tightly-Coupled EKF Quaternions
