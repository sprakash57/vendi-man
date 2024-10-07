import { ChangeEvent, FormEvent, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { FileMetadata } from '@/types';

const Upload = () => {
  const { apiErrorHandler, api } = useAxios();
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileMetadata[]>([]);

  const uploadFiles = async (files: FormData) => {
    try {
      const { data } = await api.post('/uploads/file', files, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data);
      setUploadedFiles(data.files);
      setFiles(null);
    } catch (error) {
      apiErrorHandler(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (files) {
      formData.append('title', (e.currentTarget['title'] as unknown as HTMLInputElement).value);
      for (const file of files) {
        formData.append('files', file);
      }
      console.log(files);
      uploadFiles(formData);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleDelete = async (versionId: string) => {
    try {
      await api.delete(`/uploads/${versionId}`);
      setUploadedFiles(uploadedFiles.filter(f => f.versionId !== versionId));
    } catch (error) {
      apiErrorHandler(error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input type='text' name='title' id='title' />
        <input type='file' name='attachment' id='attachment' multiple onChange={handleFileChange} />
        <button type='submit'>Upload</button>
      </form>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            {file.originalname} <button onClick={() => handleDelete(file.versionId)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Upload;
