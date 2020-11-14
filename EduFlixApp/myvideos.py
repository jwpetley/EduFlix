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
        'SELECT p.id, s3link, created, owner_id, title'
        ' FROM video p JOIN user u ON p.owner_id = u.id'
        ' ORDER BY created DESC'
    ).fetchall()


    #flash(error)

    return render_template('MyVideos/myvideos.html', videos=videos)
