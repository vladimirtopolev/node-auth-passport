# JWT
Foe authentication youu need to pass JWT in header with name "Authorization" following next  format:

        JWT <JWT_TOKEN>
Try out that everething works properly to complete the following command:
        
        curl -v http://localhost:3000/api/secure -H "Authorization: JWT <JWT_TOKEN>"
