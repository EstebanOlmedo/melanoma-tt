import azure.functions as func
import datetime
import json
import logging

import dispatcher

app = func.FunctionApp()

@app.function_name(name="operation")
@app.route(route="analyze")
def analyze(req: func.HttpRequest) -> func.HttpResponse:
    body = req.get_json()
    if 'blobNames' not in body:
        return func.HttpResponse("bad request", status_code=400)
    if 'op' not in body:
        return func.HttpResponse("bad request", status_code=400)

    result = dispatcher.dispatch(body['op'], body['blobNames'])
    return func.HttpResponse(
            json.dumps(result['data']),
            mimetype="application/json",
            status_code=result['status']
    )