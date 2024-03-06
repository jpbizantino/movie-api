# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma file (assuming it's named prisma/schema.prisma) to the working directory
COPY prisma/schema.prisma .

# Copy Prisma file (assuming it's named prisma/schema.prisma) to the working directory
RUN npx prisma generate


# Copy .env file to the working directory
COPY .env .

# Copy only the 'dist' directory
COPY dist/ dist/

# Expose the port on which the application will run
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]