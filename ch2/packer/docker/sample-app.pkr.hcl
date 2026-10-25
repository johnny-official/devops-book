packer {
  required_plugins {
    docker = {
      version = "~> 1"
      source  = "github.com/hashicorp/docker"
    }
  }
}

source "docker" "sample-app" {
  image  = "node:24-bookworm-slim"
  commit = true
  changes = [
    "WORKDIR /app",
    "USER node",
    "EXPOSE 8080",
    "ENTRYPOINT [\"node\"]",
    "CMD [\"/app/app.js\"]",
  ]
}

build {
  sources = ["source.docker.sample-app"]

  provisioner "shell" {
    inline = ["mkdir -p /app"]
  }

  provisioner "file" {
    source      = "${path.root}/../app.js"
    destination = "/app/app.js"
  }

  provisioner "shell" {
    inline = ["chmod 0755 /app && chmod 0644 /app/app.js"]
  }

  post-processor "docker-tag" {
    repository = "sample-app"
    tags       = ["local"]
  }
}
