New-ADGroup -Name "Test" -GroupScope "DomainLocal"
New-ADUser -GivenName Bob -Surname Tester -Name "Bob Tester" -SamAccountName btester -Enabled $True -AccountPassword (ConvertTo-SecureString "Pass@word1!" -AsPlainText -force) -PasswordNeverExpires $True
Add-ADGroupMember -Identity Test -Members "btester"