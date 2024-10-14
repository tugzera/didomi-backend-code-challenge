# Image
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /usr/app

# Copy the entire monorepo
COPY . .

# Install all dependencies (including devDependencies)
RUN yarn install

# Build all workspaces (apps + shared packages)
RUN yarn build

# Run application
CMD ["node", "apps/events/dist/main.js"]