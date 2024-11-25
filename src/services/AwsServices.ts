import AWS from "aws-sdk";

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET || "";
const REGION = import.meta.env.VITE_REGION || "";
const ACCESS_KEY_S3 = import.meta.env.VITE_ACCESS_KEY_S3 || "";
const SECRET_KEY_S3 = import.meta.env.VITE_SECRET_KEY_S3 || "";

AWS.config.update({
  accessKeyId: ACCESS_KEY_S3,
  secretAccessKey: SECRET_KEY_S3,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadFile = (
  key: string,
  file: File,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  callback: () => void
): void => {
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: S3_BUCKET,
    Key: key,
    ContentType: file.type,
    ContentDisposition: "inline",
  };

  myBucket
    .putObject(params)
    .on("httpUploadProgress", (evt: AWS.S3.ManagedUpload.Progress) => {
      setProgress(Math.round((evt.loaded / evt.total) * 100));
    })
    .send((err: Error) => {
      if (err) {
        console.error(err);
      } else {
        callback();
      }
    });
};

export default UploadFile;
