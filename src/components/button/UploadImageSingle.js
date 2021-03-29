import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { api } from 'src/stores/apis';

function UploadImageSingle(props) {
  const { src, handleChangeUpload } = props;

  async function browserUpload(file) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const resp = await api.upload.postForm(formData);
      handleChangeUpload(resp['Location']);
    } else {
      handleChangeUpload('');
    }
  }

  return (
    <div className={`image-uploader ${src ? 'none-border' : ''}`}>
      {!src ? (
        <div tabindex="0" className="el-upload el-upload--text">
          <label className="image-detail">
            <CloudUploadIcon className="icon-upload" />
            <input type="file" accept="image/*" className="el-upload__input" onChange={(e) => browserUpload(e.target.files[0])} />
          </label>
        </div>
      ) : (
        <div className="image-uploaded">
          <img src={src} alt="" />
          <IconButton aria-label="delete" className="btn-delete-image" onClick={() => browserUpload()}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default UploadImageSingle;
