# Get the sources for this component (e.g., main.c)
idf_component_get_sources(srcs "main.c")

# ---- Link Shared Libraries (Recursive) ----
# 1. Get the top-level 'firmware' directory path.
get_filename_component(FIRMWARE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../.. ABSOLUTE)
set(LIB_DIR ${FIRMWARE_DIR}/lib)

# 2. Recursively find all .c and .cpp source files in the lib directory.
file(GLOB_RECURSE LIB_SOURCES
    "${LIB_DIR}/*.c"
    "${LIB_DIR}/*.cpp"
)

# 3. Add the discovered shared library source files to this component.
list(APPEND srcs ${LIB_SOURCES})

# 4. Add the 'firmware' directory to the include path for this component.
#    This enables using #include <lib/dsp/iir/iir.h>.
set(COMPONENT_INCLUDE_DIRS "${FIRMWARE_DIR}")
# -------------------------------------------

# Register the component with the ESP-IDF build system
idf_component_register(SRCS "${srcs}")
