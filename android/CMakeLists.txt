cmake_minimum_required(VERSION 3.4.1)
project(TarGz)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 14)

include(FetchContent)

FetchContent_Declare(
    Corrosion
    GIT_REPOSITORY https://github.com/corrosion-rs/corrosion.git
    GIT_TAG v0.4 # Optionally specify a commit hash, version tag or branch here
)

FetchContent_MakeAvailable(Corrosion)

corrosion_import_crate(MANIFEST_PATH ../targz/Cargo.toml NO_LINKER_OVERRIDE)

add_library(react-native-tar-gz SHARED ./cpp/cpp-adapter.cpp)

target_link_libraries(react-native-tar-gz PUBLIC targz)

include_directories(./cpp)
