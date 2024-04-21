extern "C" int8_t compress_rs(const char* source, const char* destination);

extern "C" int8_t uncompress_rs(const char* source, const char* destination);

extern "C" int last_error_length();

extern "C" int last_error_message(char* buffer, int length);