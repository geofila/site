from flask import Flask, render_template, request, jsonify
import os
from io_dict import *
import threading

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('form.html')

@app.route('/vote')
def vote():
	return render_template('vote.html')


@app.route('/get_melodies', methods=['POST'])
def get_melodies():
	files = os.listdir('static/samples')
	return jsonify({'files': files})


@app.route('/insert', methods=['POST'])
def insert():
	musician = request.form['musician']
	song = request.form['source']
	creator = request.form['creator']
	satisfaction = request.form['satisfaction']
	interesting = request.form['interesting']

	if (musician == 0 or song == 0 or creator == 0 or satisfaction == 0 or interesting ==0):
		return jsonify({'data': 'hmmmm.....!!!'})
	path = 'static/ratings/' + musician
	try:
		lock = threading.Lock()
		with lock:
			d = load_obj(path)
			d[song][0].append(creator)
			d[song][1].append(satisfaction)
			d[song][2].append(interesting)
			save_obj(d, path)
		return jsonify({'data': 'Ok'})
	except Exception as e:
		return jsonify({'data': 'Erooorrr' })



if __name__ == '__main__':
	app.run(debug=True)
