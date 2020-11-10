# Git Green Wave

## Usage

## Target repository

## Configuration file

https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line

## Google Cloud deployment

```console
$ gcloud projects create github-green-wave
```

```console
$ gcloud config set project github-green-wave
```

https://cloud.google.com/compute/docs/regions-zones

```console
$ gcloud config set functions/region europe-west1
```

```console
gcloud pubsub topics create start-green-wave
```

```console
$ gcloud functions deploy githubGreenWave --runtime nodejs10 --trigger-topic start-green-wave
```

```console
Allow unauthenticated invocations of new function [githubGreenWave]? (y/N)?
```

```console
gcloud scheduler jobs create pubsub github-green-wave --topic=start-green-wave --schedule="0 12-18/2 * * 1-5" --time-zone="Europe/Brussels" --message-body="undefined"
```

https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

https://cloud.google.com/sdk/gcloud/reference/scheduler/jobs/create/pubsub

```console
gcloud functions call publish --data '{ "topic": "start-green-wave", "message": "undefined" }'
```

```console
$ gcloud functions deploy githubGreenWave --runtime nodejs10 --trigger-http GET --allow-unauthenticated
```

## Similar projects
