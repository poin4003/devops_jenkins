pipeline {
    agent any

    environment {
        DOCKER_IMAGE = '400034/express_backend'
        DOCKER_TAG = 'latest'
        // TELEGRAM_BOT_TOKEN = '7616316349:AAHdwbtNafUfIRzKB05ejgfbHkiLw2CTWbw'
        // TELEGRAM_CHAT_ID = '-4780693568'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/poin4003/devops_jenkins.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy Golang to DEV') {
            steps {
                echo 'Deploying to DEV...'
                sh 'docker image pull 400034/express_backend:latest'
                sh 'docker container stop express_backend || echo "this container does not exist"'
                sh 'echo y | docker container prune '

                sh 'docker container run -d --rm --name express_server_backend -p 3001:3001 400034/express_backend:latest'
            }
        }
    }

    post {
        always {
            cleanWs()
        }

        // success {
        //     sendTelegramMessage("✅ Build #${BUILD_NUMBER} was successful! ✅")
        // }

        // failure {
        //     sendTelegramMessage("❌ Build #${BUILD_NUMBER} failed. ❌")
        // }
    }
}

// def sendTelegramMessage(String message) {
//     sh """
//     curl -s -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage \
//     -d chat_id=${TELEGRAM_CHAT_ID} \
//     -d text="${message}"
//     """
// }