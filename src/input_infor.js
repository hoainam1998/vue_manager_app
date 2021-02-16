const  input_tensanpham_infor = {
    name: "tensanpham",
    label: "Ten san pham",
    own:'sanpham',
    feedback: `This is a required field and must be at least 4 characters
        and most 15 characters.`
}

const input_giasanpham_infor = {
    name: "gia",
    label: "Gia san pham",
    own:'sanpham',
    feedback: `This is a required field and must be at least 4 characters
    and is number.`
}

const  input_tendangnhap_infor={
    name: 'tendangnhap',
    label: 'Ten dang nhap',
    own:'user',
    feedback: `This is a required field and must be at least 4 characters
    and most 15 characters.`
}

const input_tennhanvien_infor={
    name: 'tennhanvien',
    label: 'Ten nhan vien',
    own:'user',
    feedback: `This is a required field and must be at least 2 characters
    and most 15 characters.`
}

const input_honhanvien_infor={
    name: 'honhanvien',
    label: 'Ho nhan vien',
    own:'user',
    feedback: `This is a required field and must be at least 2 characters
    and most 6 characters.`
}

const checkbox_trangthai_sanpham_infor={
    checked: 'Hoat dong',
    unchecked: 'Ko hoat dong'
}

const checkbox_trangthai_user_infor={
    checked: 'Dang lam',
    unchecked: 'Da nghi'
}

export default {
    input_tensanpham_infor,
    input_giasanpham_infor,
    input_tendangnhap_infor,
    input_tennhanvien_infor,
    input_honhanvien_infor,
    checkbox_trangthai_sanpham_infor,
    checkbox_trangthai_user_infor
}