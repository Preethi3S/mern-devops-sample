pipeline {
  agent any
  stages {
    stage('Checkout')           { steps { checkout scm } }
    stage('Build Docker Images') {
      steps {
        script {
          docker.build("mern-backend:latest", "backend/")
          docker.build("mern-frontend:latest", "frontend/")
        }
      }
    }
    stage('Load Images to kind') {
      steps {
        sh '''
          kind load docker-image mern-backend:latest
          kind load docker-image mern-frontend:latest
        '''
      }
    }
    stage('Terraform Apply') {
      steps {
        dir('infra') {
          sh 'terraform init'
          sh 'terraform apply -auto-approve'
        }
      }
    }
  }
}
