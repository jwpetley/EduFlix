from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from EduFlixApp.db import get_db

bp = Blueprint('myvideos', __name__, url_prefix='/myvideos')

@bp.route('/',  methods=('GET', 'POST'))
def myvideos():
    user_id = session.get('user_id')
    error = None
    db = get_db()
    videos = db.execute(
        'SELECT p.id, s3link, created, owner_id'
        ' FROM video p JOIN user u ON p.owner_id = u.id'
        ' ORDER BY created DESC'
    ).fetchall()


    if request.method == 'POST':
        s3link = request.form['s3link']
        db = get_db()


        if db.execute(
            'SELECT id FROM video WHERE s3link = ?', (s3link,)
        ).fetchone() is not None:
            error = 'Video {} is already uploaded.'.format(s3link)

        if error is None:

            db.execute(
                'INSERT INTO video (s3link, owner_id) VALUES (?, ?)',(s3link, user_id))
            db.commit()

    flash(error)

    return render_template('MyVideos/myvideos.html', videos=videos)
