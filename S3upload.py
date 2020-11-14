access_key='AKIA6DKSR4M556OULTXU'
secret_key='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'
import os
import boto3
import logging
from botocore.exceptions import ClientError

def upload_file(file_name,file_path,user_id):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :user_id: Create or use a current file that is specific to a user
    :return: True if file was uploaded, else False
    """

    object_name = str(user_id) + '/'+ str(file_name)
    object_upload=str(file_path) + str(file_name)
    bucket_name='eduflixvid'

    # Upload the file
    s3_client = boto3.client('s3',access_key,secret_key)
    try:
        response = s3_client.upload_file(object_upload, bucket_name, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

file='CuteCat1.mp4'
path='D:'
Uploaded=upload_file(file,path,'Eve')
print(Uploaded)
