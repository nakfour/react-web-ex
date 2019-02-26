# react-web-ex
Example repo implementing [Modern web applications on OpenShift: Part 2 — Using chained builds](https://developers.redhat.com/blog/2018/10/23/modern-web-applications-on-openshift-part-2-using-chained-builds/) by [Lucas Holmquist](https://github.com/lholmquist). Code is based heavily on his example [react-web-app](https://github.com/lholmquist/react-web-app), and additionally add a sample backend service and configure nginx to proxy requests from the UI to the service.


Changes:
- **nginx.conf** - By adding the [nginx.conf](https://github.com/cfchase/react-web-ex/blob/master/react-web-app/public/nginx.conf) to the `public` directory in the React app, this file is copied with the built react app for distribution.  From that source directory, the nginx s2i image picks up the configuration and uses it, allowing the react app to send it's api calls to the api server.

- **yarn** - `YARN_ENABLED="true"` Setting this environment variable in the [build config](https://github.com/cfchase/react-web-ex/blob/a02084b55b690c951dea24bc7625a29da877a050/openshift/react-web-app.yml#L74-L75) will make sure the build uses yarn instead of npm and honor the `yarn.lock` file instead of creating a new `package-lock.json` file and failing if the updated dependencies do not work correctly.

## openshift
Deployment scripts and OpenShift templates.
```bash
# to deploy to minishift
minishift up
./openshift/deploy.sh
```

## nodejs-server
NodeJS rest server with a single endpoint `GET /api/status`.  The service is NOT exposed via a route and is only available internally.

## react-web-app
React app which requests /api/status from a configured service.  The nginx.conf file has [configured](https://github.com/cfchase/react-web-ex/blob/master/react-web-app/public/nginx.conf#L56-L62) `/api` calls to be routed to the nodejs server.
```nginx
# /public/nginx.conf
server {
    # ...
    location /api/ {
        proxy_pass http://nodejs-server:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    # ...
}
```
This is copied in automatically by create-react-app since it's in the public folder, but in a different framework you may need manually copy the file in a postbuild step similar to the following.
```json
{
  "name": "some-other-web-app",
  "scripts": {
    "postbuild": "cp configs/nginx.conf build_output_folder",
  }
}
```

## nginx-ex
Traditional nginx s2i project with an nginx.conf file at it's root.  Uses the built assets from react-web-app and similarly calls `GET /api/status`


