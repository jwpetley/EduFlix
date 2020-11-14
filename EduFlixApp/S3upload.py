import os
import boto3
import logging
from botocore.exceptions import ClientError
import sys

def upload_file_from_path(file_name,file_path,user_id):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :user_id: Create or use a current file that is specific to a user
    :return: True if file was uploaded, else False
    """
    access_key='AKIA6DKSR4M556OULTXU'
    secret_key='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'


    object_name = str(user_id) + '/'+ str(file_name)
    object_upload=str(file_path) + str(file_name)
    bucket_name='eduflixvid'

    #sys('export AWS_ACCESS_KEY_ID=AKIA6DKSR4M556OULTXU')

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(object_upload, bucket_name, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

def upload_file_object(file, user_id):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :user_id: Create or use a current file that is specific to a user
    :return: True if file was uploaded, else False
    """
    access_key='AKIA6DKSR4M556OULTXU'
    secret_key='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'

    object_name = str(user_id) + '/'+ str(file.filename)
    #object_upload=str(file_path) + str(file_name)
    bucket_name='eduflixvid'

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_fileobj(file, bucket_name, object_name, ExtraArgs={'ACL':'public-read'})
    except ClientError as e:
        logging.error(e)
        return False
    return True

if __name__ == "__main__":

    file='myvideos.py'
    path=''
    Uploaded=upload_file_from_path(file,path,'Eve')
    print(Uploaded)
