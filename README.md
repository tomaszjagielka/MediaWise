# 1991HackathonMedia

## How to deploy lambda function on AWS
1. Create lambda function from scratch
2. Pack requirements to zip file
```python
pip install -t lib -r lambda_requirements.txt
```
```python
(cd lib; zip ../lambda_function.zip -r .)
```
```python
zip lambda_function.zip -u lambda_function.py
```
3. Upload zip file as code to lambda function
4. Make functional URL
- Change AWS_IAM to NONE
- Configure CORS
5. Ready to make requests