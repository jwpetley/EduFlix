from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

bp = Blueprint('upload', __name__, url_prefix='/upload')

@bp.route('/')
def upload():
    return render_template('Upload/upload.html')