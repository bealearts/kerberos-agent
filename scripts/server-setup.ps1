Install-windowsfeature -name AD-Domain-Services;

Import-Module ADDSDeployment;
Install-ADDSForest –DomainName mycompany.local -SafeModeAdministratorPassword (ConvertTo-SecureString -String "YX6oio7nHH+a)X1" -AsPlainText -Force) -Force:$true -NoRebootOnCompletion:$true;

