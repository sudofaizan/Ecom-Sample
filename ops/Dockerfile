# Use the official Nginx image as the base image
FROM nginx:alpine

# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*
RUN apk add --update py-pip python3
RUN pip install openpyxl pandas --break-system-packages

# Copy all your static files to the working directory
COPY ops/. .
COPY app .
RUN cd converter && sh converter.sh

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["sh", "cmd.sh"]