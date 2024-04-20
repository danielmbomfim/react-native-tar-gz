#include <string>

extern "C" int8_t compress_rs(std::string source, std::string destination);

extern "C" int8_t uncompress_rs(std::string source, std::string destination);

extern "C" int last_error_length();

extern "C" int last_error_message(char* buffer, int length);