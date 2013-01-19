from fabric.api import *
from datetime import datetime

#env.user = "ec2-user"
#env.key_filename = ["~/.ec2/keys/CraigEdmundsGmailEUWest.pem"]
#env.hosts = ['ec2-user@ec2-176-34-243-230.eu-west-1.compute.amazonaws.com']

def amazon():
    env.user = "ec2-user"
    env.key_filename = ["~/.ec2/keys/CraigEdmundsGmailEUWest.pem"]
    env.hosts = ['ec2-176-34-243-230.eu-west-1.compute.amazonaws.com']
    env.config_ds = 'config/stage-kernel.conf'
    env.config_admin = 'whisk-adminsite/conf/admin.conf'

def azure():
    env.user = "whisk"
    env.key_filename = ["~/.whisk-testkeys/Azure/Keys/PK.key"]
    env.hosts = ['whisk-test8.cloudapp.net']
    env.config_ds = 'config/stage-kernel-azure.conf'
    env.config_admin = 'whisk-adminsite/conf/admin-azure.conf'

def pack():
    # assembly one jar
    local('sbt "whisk-api/assembly"', capture=False)

def packAdmin():
    local('sbt whisk-adminsite/assembly', capture=False)

def packGate():
    local("pushd semantic_analysis; zip -r /tmp/gate.zip gate -x \*.DS_Store; popd")

def deploy():
    time = datetime.now().isoformat()
    put('whisk-api/target/whisk-api-assembly-*.jar', '/tmp/whisk-api-assembly.jar')
    with cd('/usr/local/foodient-ds/'):
        sudo('touch whisk-api-assembly.jar')
        sudo('mv whisk-api-assembly.jar whisk-api-assembly-%s.jar' % (time))
        sudo('touch logs/whisk.log')
        sudo('mv logs/whisk.log logs/whisk-%s.log' % (time))
        sudo('mv /tmp/whisk-api-assembly.jar .')

def deployAdmin():
    time = datetime.now().isoformat()
    put('whisk-adminsite/target/whisk-admin-assembly.jar', '/tmp/')
    with cd('/usr/local/foodient-admin/'):
        sudo('touch whisk-admin-assembly.jar')
        sudo('mv whisk-admin-assembly.jar whisk-admin-assembly-%s.jar' % (time))
        sudo('mv /tmp/whisk-admin-assembly.jar .')

def deployGate():
    packGate()
    put('/tmp/gate.zip', '/tmp/')
    with cd('/usr/local/foodient-ds/'):
        run('rm -rf gate')
        run('unzip /tmp/gate.zip')

def uploadConfig():
    put(env.config_ds, '/tmp/stage-kernel.conf')
    with cd('/usr/local/foodient-ds/'):
        sudo('mv /tmp/stage-kernel.conf ./')

def uploadAdminConfig():
    put(env.config_admin, '/tmp/')
    with cd('/usr/local/foodient-admin/'):
        sudo('mv /tmp/admin-azure.conf ./admin.conf')

def restart():
    sudo('monit stop whisk-api', pty=True)
    sudo('monit start whisk-api', pty=True)

def restartAdmin():
    run('sudo service foodient-admin restart', pty=False)

def cleanLocalData():
    local(_cleanMongoCmd("mongo 127.0.0.1:27017/whisk_test_v2"))

@hosts('whisk-test.cloudapp.net')
def cleanTestAzureData():
    azure()
    run(_cleanMongoCmd("mongo 127.0.0.1:27017/whisk_test_v2"))

def cleanTestCache():
    run('echo "flush_all" | nc 127.0.0.1 11211')

def cleanTestData():
    local(_cleanMongoCmd("mongo penny.mongohq.com:10028/whisk_test_v2 -u testapi -pt35tap1"))

def _cleanMongoCmd(connStr):
    f = open("scripts/mongo-clear.js", "r")
    mongoScript = f.read()
    f.close()
    return '%s --eval "%s"' % (connStr, mongoScript)
