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
    s3_client = boto3.client('s3',aws_access_key_id=ACCESS_KEY,
                aws_secret_access_key=SECRET_KEY,
                    aws_session_token=SESSION_TOKEN)
    try:
        response = s3_client.upload_file(object_upload, bucket_name, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True

def upload_file_object(file, username, title):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :user_id: Create or use a current file that is specific to a user
    :return: True if file was uploaded, else False
    """
    access_key='AKIA6DKSR4M556OULTXU'
    secret_key='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'

    object_name = str(username) + '/'+ str(title) + ".mp4"
    #object_upload=str(file_path) + str(file_name)
    bucket_name='eduflixvid'
    print(object_name)
    # Upload the file
    session = boto3.Session(aws_access_key_id='AKIA6DKSR4M556OULTXU',
                aws_secret_access_key='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')
    s3_client = session.client('s3')
    try:
        response = s3_client.upload_fileobj(file, bucket_name, object_name, ExtraArgs={'ACL':'public-read'})
    except ClientError as e:
        logging.error(e)
        return False
    print("Good Upload")
    return True

if __name__ == "__main__":

    #file='myvideos.py'
    #path=''
    #Uploaded=upload_file_from_path(file,path,'Eve')
    #print(Uploaded)

    s3_client = boto3.client('s3')
    s3 = boto3.resource('s3')
    my_bucket = s3.Bucket('eduflixvid')
    for my_bucket_object in my_bucket.objects.all():
        print(my_bucket_object)
