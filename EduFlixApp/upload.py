from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from . import S3upload
from EduFlixApp.db import get_db

bp = Blueprint('upload', __name__, url_prefix='/upload')

@bp.route('/', methods=['GET', 'POST'])
def upload():
    user_id = session.get('user_id')
    if request.method == 'POST':
        title = request.form['title']
        #Somehow we get S3 link run some functions to upload and retrieve S3 link
        print(request.files.keys())
        file = request.files['file']

        S3upload.upload_file_object(file, user_id)
        #Here we try the upload and add some if statements in case they fail


        s3link = 'https://eduflixvid.s3.amazonaws.com/%s/%s'%(user_id, file.filename)

        db = get_db()
        error = None


        if db.execute(
            'SELECT id FROM video WHERE s3link = ?', (s3link,)
        ).fetchone() is not None:
            error = 'Video {} is already uploaded.'.format(s3link)

        if error is None:

            db.execute(
                'INSERT INTO video (s3link, owner_id, title) VALUES (?, ?, ?)',(s3link, user_id, title))
            db.commit()

            return redirect(url_for('myvideos.myvideos'))


    return render_template('Upload/upload.html')
