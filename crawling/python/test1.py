from selenium import webdriver
from bs4 import BeautifulSoup
from time import sleep
import requests
import json
import re
import pymysql

header = {'User-Agent': ''}
d = webdriver.Chrome('./chromedriver')
d.implicitly_wait(3)
d.get('http://www.melon.com/chart/index.htm')
d.get("http://www.melon.com/chart/search/index.htm")
d.find_element_by_xpath('//*[@id="d_chart_search"]/div/h4[1]/a').click()


age_xpath = '//*[@id="d_chart_search"]/div/div/div[1]/div[1]/ul/li[' + str(1) + ']/span/label'
age = d.find_element_by_xpath(age_xpath)
age.click()



result = list()

try:
    year_xpath = '//*[@id="d_chart_search"]/div/div/div[2]/div[1]/ul/li[' + str(1) + ']/span/label'
    year = d.find_element_by_xpath(year_xpath)
    year.click()
    print(year.text)

except:
    print("year_xpath not found")
    pass


try:
    month_xpath = '//*[@id="d_chart_search"]/div/div/div[3]/div[1]/ul/li[' + str(11) + ']/span/label'
    month = d.find_element_by_xpath(month_xpath)
    month.click()
    print(month.text)

except:
    print("year_xpath not found")
    pass


try:
    week_xpath = '//*[@id="d_chart_search"]/div/div/div[4]/div[1]/ul/li[' + str(1) + ']/span/label'
    week = d.find_element_by_xpath(week_xpath)
    week.click()
    print(week.text)

except:
    print("year_xpath not found")
    pass

classCd = d.find_element_by_xpath('//label[@for = "gnr_1"]')
if '가요' not in classCd.text:
    classCd = d.find_element_by_xpath('//label[@for = "gnr_2"]')

print(classCd.text)
classCd.click()

d.find_element_by_xpath('//*[@id="d_srch_form"]/div[2]/button/span/span').click()
sleep(10)
song_ids = d.find_elements_by_xpath('//*[@id="lst50"]/td[4]/div/a')
song_ids = [re.sub('[^0-9]', '', song_id.get_attribute("href")) for song_id in song_ids]
ranks = d.find_elements_by_xpath('//*[@id="lst50"]/td[2]/div/span[1]')

for rank, song_id in zip(ranks, song_ids):
    sleep(5)
    print(song_id)

    req = requests.get('http://www.melon.com/song/detail.htm?songId=' + song_id, headers=header)
    html = req.text
    soup = BeautifulSoup(html, "html.parser")

    title = soup.find(attrs={"class": "song_name"}).text.replace('곡명', '')

    if '19금' in title:
        title = title.replace('19금', '')

    title = re.sub('^\s*|\s+$', '', title)

    artist = soup.find(attrs={"class": "artist_name"}).text

    album = soup.select('#downloadfrm > div > div > div.entry > div.meta > dl > dd')[0].text

    genre = soup.select('#downloadfrm > div > div > div.entry > div.meta > dl > dd')[2].text

    lyric = re.sub('<[^>]*>|\s|\[|\]', ' ', str(soup.find_all(attrs={"class": "lyric"})[0]))
    lyric = re.sub('^\s*|\s+$', '', lyric)


    result.append({
        'year': str(re.sub('[^0-9]', '', year.text)),
        'rank': int(rank.text),
        'title': str(title),
        'artist': str(artist),
        'album': str(album),
        'genre': str(genre)
    })
    #print(type(result))
    #print(result)
    print("차트 연도:", year.text)
    print("순위:", rank.text)
    print("곡 id:", song_id)
    print("제목:", title)
    print("아티스트:", artist)
    print("앨범:", album)
    print("장르:", genre)
    print("*_*_*_*_*_*_*_*_*_*_*__*_*_*")
with open('./data/melon_chart' + re.sub('[^0-9]', '', age.text) + 's.json', 'w', encoding='utf-8') as f:
    j = json.dumps(result)
    f.write(j)

mydb = pymysql.connect(
  host="localhost",
  user="root",
  passwd="111111",
  database="user_info"
)
mycursor = mydb.cursor()

sql = "INSERT INTO melonchart (year, ranking, title, artist, album, genre) VALUES (%s, %s, %s, %s, %s, %s)"

for value in result:
    a=value.values()
    temp=[]
    for i in a:
        temp.append(i)
    print(temp)
    mycursor.execute(sql, temp)

mydb.commit()

print(mycursor.rowcount, "record inserted.")
