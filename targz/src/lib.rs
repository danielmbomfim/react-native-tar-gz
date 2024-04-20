use std::{
    ffi::{c_char, CStr, OsString},
    fmt::Display,
    fs::File,
};

use erros::update_last_error;

mod erros;

use flate2::{read, write, Compression};
use tar::Archive;

#[no_mangle]
pub extern "C" fn uncompress_rs(source_path: *const c_char, destination_path: *const c_char) -> u8 {
    let result = std::panic::catch_unwind(|| {
        let source = unsafe { CStr::from_ptr(source_path) };
        let destination = unsafe { CStr::from_ptr(destination_path) };

        uncompress(source.to_str().unwrap(), destination.to_str().unwrap()).unwrap();
    });

    if let Err(error) = result {
        let error_str = match error.downcast::<String>() {
            Ok(v) => *v,
            Err(e) => match e.downcast::<&str>() {
                Ok(v) => v.to_string(),
                _ => "Unknown Source of Error".to_owned(),
            },
        };

        update_last_error(error_str);
        return 0;
    }

    1
}

#[no_mangle]
pub extern "C" fn compress_rs(source_path: *const c_char, destination_path: *const c_char) -> u8 {
    let result = std::panic::catch_unwind(|| {
        let source = unsafe { CStr::from_ptr(source_path) };
        let destination = unsafe { CStr::from_ptr(destination_path) };

        compress(source.to_str().unwrap(), destination.to_str().unwrap()).unwrap();
    });

    if let Err(error) = result {
        let error_str = match error.downcast::<String>() {
            Ok(v) => *v,
            Err(e) => match e.downcast::<&str>() {
                Ok(v) => v.to_string(),
                _ => "Unknown Source of Error".to_owned(),
            },
        };

        update_last_error(error_str);
        return 0;
    }

    1
}

pub fn uncompress(source: &str, destination: &str) -> Result<(), String> {
    let tar_file = File::open(source).map_err(convert_error)?;
    let mut archive = Archive::new(read::GzDecoder::new(tar_file));

    archive
        .entries()
        .map_err(convert_error)?
        .filter_map(|e| e.ok())
        .map(|mut entry| -> Result<OsString, String> {
            let path = entry
                .path()
                .map_err(convert_error)?
                .file_name()
                .ok_or("Failed to read file")?
                .to_owned();

            entry
                .unpack(format!(
                    "{}/{}",
                    destination,
                    path.to_str().ok_or("failed to unpack file")?
                ))
                .map_err(convert_error)?;

            Ok(path)
        })
        .filter_map(|e| e.ok())
        .for_each(|x| println!("> {:?}", x));

    Ok(())
}

pub fn compress(source: &str, destination: &str) -> Result<(), String> {
    let tar_file = File::create(destination).map_err(convert_error)?;

    let encoder = write::GzEncoder::new(tar_file, Compression::default());

    let mut tar = tar::Builder::new(encoder);

    tar.append_dir_all("", source).map_err(convert_error)?;

    Ok(())
}

fn convert_error<T: Display>(err: T) -> String {
    err.to_string()
}
