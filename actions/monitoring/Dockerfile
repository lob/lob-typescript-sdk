FROM node:14.16-alpine

# Copy code file from action repository to "/" in the container
COPY entrypoint.sh /entrypoint.sh

# Set code file to execute when container starts up.
# Use a shell form of ENTRYPOINT to support variable
# substitution of the args from action.yml.
ENTRYPOINT ["/entrypoint.sh"]