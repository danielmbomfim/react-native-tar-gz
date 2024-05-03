use std::cell::RefCell;
use std::ffi::c_char;
use std::ffi::CString;

thread_local! {
    static LAST_ERROR: RefCell<Option<String>> = RefCell::new(None);
}

pub fn update_last_error(error_message: String) {
    LAST_ERROR.with(|prev| {
        *prev.borrow_mut() = Some(error_message);
    });
}

#[no_mangle]
pub extern "C" fn get_error_message() -> *const c_char {
    let message = LAST_ERROR.with(|prev| match *prev.borrow() {
        None => CString::new("").unwrap(),
        Some(ref error) => CString::new(error.as_str()).unwrap(),
    });

    message.into_raw()
}
