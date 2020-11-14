from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

bp = Blueprint('myvideos', __name__, url_prefix='/myvideos')

@bp.route('/')
def myvideos():
    return render_template('MyVideos/myvideos.html')
