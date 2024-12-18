# Stencilight Rank Server

## 1. How to run

1. node.js 설치
2. node.js 초기화

```shell
npm init
```

3. 실행

```shell
npm run dev
```

## 2. API Endpoints

### GET /handshake

서버 살아있는지 확인하는 용도

**Response**

```json
"Thu Nov 21 2024 02:09:52 GMT+0900 (대한민국 표준시)" // 현재 시간
```

---

### GET /user

특정 유저의 정보를 가져옴  
**Parameters**
| Name | Required | Type |Description |
| -------------:|:--------:|:-------:| ----------- |
| `uid` | required | string | User ID |

**Response**

```json
{
  "uid": "b45849ab-27ae-48cb-9aff-2c913b2fbc8d",
  "name": "test1",
  "max_score_3": 12,
  "max_score_4": 125,
  "max_score_5": 1557
}
```

---

### GET /user/list

모든 유저의 정보를 가져옴  
**Response**

```json
[
  {
    "uid": "b45849ab-27ae-48cb-9aff-2c913b2fbc8d",
    "name": "test1",
    "max_score_3": 12,
    "max_score_4": 125,
    "max_score_5": 1557
  },
  {
    "uid": "4f4db23c-8088-4a07-9eb4-4fb301be9665",
    "name": "test2",
    "max_score_3": 0,
    "max_score_4": 0,
    "max_score_5": 0
  },
  {
    "uid": "70f0e41c-fff2-4331-8beb-eaa8ba1e013b",
    "name": "test3",
    "max_score_3": 100,
    "max_score_4": 156,
    "max_score_5": 15
  }
]
```

---

### GET /user/rank

특정 게임 타입의 랭킹 리스트를 가져옴  
**Parameters**
| Name | Required | Type |Description |
| -------------:|:--------:|:-------:| ----------- |
| `type` | required | int | `3`과 `5`사이의 정수여야 함 |

**Response**

```json
[
  {
    "uid": "70f0e41c-fff2-4331-8beb-eaa8ba1e013b",
    "name": "test3",
    "max_score": 100,
    "rank": 1
  },
  {
    "uid": "b45849ab-27ae-48cb-9aff-2c913b2fbc8d",
    "name": "test1",
    "max_score": 12,
    "rank": 2
  },
  {
    "uid": "4f4db23c-8088-4a07-9eb4-4fb301be9665",
    "name": "test2",
    "max_score": 0,
    "rank": 3
  }
]
```

---

### POST /user

유저를 생성함  
**Parameters**
| Name | Required | Type |Description |
| -------------:|:--------:|:-------:| ----------- |
| `name` | required | string | 유저 이름 |

**Response**

```json
"4f4db23c-8088-4a07-9eb4-4fb301be9665" // 생성된 유저의 UID
```

---

### DELETE /user

유저를 삭제함  
**Parameters**
| Name | Required | Type |Description |
| -------------:|:--------:|:-------:| ----------- |
| `uid` | required | string | User ID |

**Response**

```json
"4f4db23c-8088-4a07-9eb4-4fb301be9665" // 삭제된 유저의 UID
```

---

### PUT /user/{uid}

유저 정보 변경  
**Parameters**
| Name | Required | Type |Description |
| -------------:|:--------:|:-------:| ----------- |
| `uid` | required | string | User ID <br> url에 파라미터로 들어감|
| `name` | optional | string | 유저 이름|
| `max_score_3` | optional | int | 3x3 최고 스코어|
| `max_score_4` | optional | int | 4x4 최고 스코어|
| `max_score_5` | optional | int | 5x5 최고 스코어|

**Response**

```json
{
  "uid": "70f0e41c-fff2-4331-8beb-eaa8ba1e013b",
  "name": "test3",
  "max_score_3": 88,
  "max_score_4": 156,
  "max_score_5": 15
}
```
