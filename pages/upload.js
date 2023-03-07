import { useState } from 'react';
import { Octokit } from '@octokit/rest';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const octokit = new Octokit({
      auth: process.env.TOKEN,
    });

    // Read the contents of the selected file
    const fileContents = await selectedFile.text();

    // Upload the file to the repository
    try {
      await octokit.repos.createOrUpdateFileContents({
        owner: 'PranavPurwar',
        repo: 'pranavpurwar.ga',
        path: selectedFile.name,
        message: `Upload ${selectedFile.name}`,
        content: Buffer.from(fileContents).toString('base64'),
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}