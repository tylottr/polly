# polly

This is a simple api that will print either a default value based on the "MESSAGE" environment variable, echo the value in the path, or echo the value in `?message=`.

## Testing

Testing is as simple as running `npm ci` then `npm run lint` for linting and `npm run test` for unit tests. Append `:ci` to the end of the command to output a file in JUnit that can be uploaded to a test suite.

## Build and Run

Just run `npm ci` to install packages and `npm start` to run the application on the host system.

## Docker Build

If building in Docker, run `docker build -t polly .` while in this folder to package this application into a Container.

To run, `docker run -d -p3000:3000 polly`
