import pytesseract
from PIL import Image
import pandas as pd
from csv import writer
from datetime import datetime

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'


def image_cap(self):
    def read(img):
        text = pytesseract.image_to_string(img)
        return text

    img = Image.open("D:\\datasets\\doc.jpg")
    id_string = read(img)
    li = list(id_string.split(" "))
    index = li.index('Id')
    pci_id = li[index + 1]
    lab_log = pd.read_csv("C:\\Users\\NAMAN\\PycharmProjects\\techthon_techmahindra\\main\\vol_lab_log.csv")
    lab = list(lab_log['Lab'])
    pct = list(lab_log['PCT id'])
    flag = False
    if pci_id in pct:
        i = pct.index(pci_id)
        l = lab[i]
        if l == 'Lab1':
            lab1 = pd.read_csv("C:\\Users\\NAMAN\\PycharmProjects\\techthon_techmahindra\\main\\vol_lab1_reason.csv")
            re1 = list(lab1['Reason1'])
            re2 = list(lab1['Reason2'])
            re3 = list(lab1['Reason3'])
            re4 = list(lab1['Reason4'])
            flag = True
            r1, r2, r3.r4 = re1[i], re2[i], re3[i], re4[i]
        else:
            otherlab = pd.read_csv("C:\\Users\\NAMAN\\PycharmProjects\\techthon_techmahindra\\main\\vol_other_lab.csv")
            lab2 = list(otherlab['Lab2'])
            lab3 = list(otherlab['Lab3'])
            lab4 = list(otherlab['Lab4'])

            l2 = lab2[i]
            l3 = lab3[i]
            l4 = lab4[i]


    else:
        def append_list_as_row(file_name, list_of_elem):
            # Open file in append mode
            with open(file_name, 'a+', newline='') as write_obj:
                # Create a writer object from csv module
                csv_writer = writer(write_obj)
                # Add contents of list as last row in the csv file
                csv_writer.writerow(list_of_elem)

        now = datetime.now()
        row_contents = [labid, pci_id, date, now]

        # Append a list as new line to an old csv file
        append_list_as_row(r"C:\Users\NAMAN\PycharmProjects\techthon_techmahindra\main\vol_log.csv", row_contents)
