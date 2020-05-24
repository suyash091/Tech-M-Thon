from kivy.app import App
from kivy.uix.widget import Widget
from kivymd.theming import ThemeManager
from kivymd.navigationdrawer import MDNavigationDrawer, NavigationLayout
from kivymd.card import MDSeparator
from kivy.uix.boxlayout import BoxLayout
import base64

import pytesseract
from PIL import Image
import pandas as pd
from csv import writer
from datetime import datetime
from kivymd.toast import toast
#from kivymd.uix.dialog import MDDialog

from Login_capture import image_cap
#from create_face_data import create_data
#from face_data_training import face_training
#from face_data_recognition import face_recog

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
class MyContent(BoxLayout):
    pass
class MainApp(App):
    dialog = None
    theme_cls = ThemeManager()
    theme_cls.theme_style = "Light"
    def cap(self):
        image_cap()
    def show_popup(self,text):
        toast(text)

    def face_data(self):
        pass
        #create_data()

    def face_data_training(self):
        pass
        #face_training()

    def face_recognition(self):
        pass
        #face_recog()


MainApp().run()
