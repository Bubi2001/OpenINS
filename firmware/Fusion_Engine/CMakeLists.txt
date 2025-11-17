cmake_minimum_required(VERSION 3.13)

# Initialize the Pico SDK. PICO_SDK_PATH must be set in your environment.
include(pico_sdk_init)

project(rp2354b_project C CXX ASM)
set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)

# This initializes the SDK and sets up the toolchain
pico_sdk_init()

# --- Custom Board Definitions for RP2354B ---
# This section is for a custom board. You must define your hardware
# specifics here, such as flash size.
# Example for a 16MB (128Mbit) flash chip:
set(PICO_FLASH_SIZE_BYTES 0x1000000)

# Define the executable target
add_executable(rp2354b
    src/main.c
)

# ---- Link Shared Libraries (Recursive) ----
# 1. Get the parent directory (firmware/) to locate the lib folder.
get_filename_component(FIRMWARE_DIR ${CMAKE_CURRENT_SOURCE_DIR} DIRECTORY)
set(LIB_DIR ${FIRMWARE_DIR}/lib)

# 2. Recursively find all .c and .cpp source files in the lib directory.
file(GLOB_RECURSE LIB_SOURCES
    "${LIB_DIR}/*.c"
    "${LIB_DIR}/*.cpp"
)

# 3. Add the discovered library source files to the target.
target_sources(rp2354b PRIVATE
    ${LIB_SOURCES}
)

# 4. Add the top-level 'firmware' directory to the include path.
#    This allows you to use #include <lib/dsp/iir/iir.h>.
target_include_directories(rp2354b PUBLIC
    ${FIRMWARE_DIR}
)
# -------------------------------------------

# Link against required Pico SDK libraries
target_link_libraries(rp2354b PUBLIC
    pico_stdlib
    hardware_i2c # Example
)

# Generate the .uf2 file for drag-and-drop programming
pico_add_extra_outputs(rp2354b)