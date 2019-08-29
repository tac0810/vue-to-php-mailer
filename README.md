# Setup View
フォームを表示させたいファイルの最上部に以下のコードを設置して下さい。
```php
<?php 
require_once 'PATH_TO_/api/mail/_inc_/utils/CSRFTokenManager.php';
use CSRFTokenManager\CSRFTokenManager;
$token = CSRFTokenManager::getCSRFToken();
 ?>
```
その後、同じファイルの任意の場所に以下のコードを設置してください。
```html
<label for="csrf-token" hidden>
  <input type="text" hidden value="<?php echo $token; ?>" id="csrf-token">
</label>
```

# Install PHPMailer

メーラー本体は `PHPMailer` を使用しているので、 `Composer` を通じてインストールしてください。

```
$ cd public/api/mail/_inc_
$ composer install
```

# Setup config

フロントエンドとバックエンドの両方の設定ファイルになります。
`public/api/mail/_inc_/config.mail.json`

## バックエンド

```json
{
  "mailer": {
    "debug": true,
    "from": {
      "mail": "sample@sample.jp",
      "name": "From Admin"
    },
    "admin": ["info@sample.jp", "dev@sample.jp"],
    "subject": "お問い合わせありがとうございました",
    "site_name": "Vue to PHP Mailer"
  }
}
```

#### `debug` : Boolean

デバッグモードの切り替え様フラグ。

- `true` フォームから入力されたメールアドレスに対して ユーザ用、管理者用のフォーマットメールが送信されます。
- `false` プロダクションモードです。ログが有効になり、後述の `admin` のアドレスに送信されます。

#### `from`: {"mail": String, "name": String}

- `mail` 送信元としたいアドレスを設定します。
- `name` 送信者の名前を設定します。

#### `admin`: Array

お問い合わせ内容を送信したい管理者アドレスを複数設定できます。

#### `subject` : String

ユーザに送信される控えメールタイトルです。

#### `site_name` : String

ユーザに送信される控えメールテンプレート内で使用します。

## フロントエンド

```json
{
  "forms": [
    {
      "label": "",
      "key": "",
      "placeholder": "",
      "type": "",
      "validation": "",
      "options": {},
      "require": true,
      "errorMsg": ["入力されていません", "形式が違います"]
    }
  ]
}
```

#### `label` : String

フォームのラベルに表示されます。

#### `key` : String

入力項目の識別に使用します。
必ず重複の無いように指定してください。

#### `placeholder` : String

初期表示テキスト用。

#### `type` : String

フォームのパーツタイプを指定できます。

- `text`
- `select`
- `textarea`
- `radio`  
  初期値は `text` 。

#### `validation` : Validator

以下のフォームのバリデーションタイプを指定できます。
今後変更の予定があり。

- PAT_NUMBER
- PAT_EMAIL
- PAT_ALPHABET
- PAT_ALPHANUMERIC
- PAT_ZENKAKU
- PAT_KATAKANA
- PAT_KANA
- PAT_PHONENUMBER_WITH_HYPHEN
- PAT_PHONENUMBER
- PAT_ZIPCODE
  `src/js/vue/form/utils/Validator.js` につなぎこむためのものです。

#### `options` : Object

フォームのパーツの設定ができます。

##### `select`

```json
{
  "options": {
    "data": [
      {
        "label": "選択してください",
        "value": null
      },
      {
        "label": "SELECT0",
        "value": "you chose SELECT0"
      },
      {
        "label": "SELECT1",
        "value": "you chose SELECT1"
      },
      {
        "label": "SELECT2",
        "value": "you chose SELECT2"
      },
      {
        "label": "SELECT3",
        "value": "you chose SELECT3"
      }
    ]
  }
}
```

##### `textarea`

```json
{
  "options": {
    "rows": 10,
    "cols": 80
  }
}
```

##### `radio`

```json
{
  "options": {
    "data": [
      {
        "label": "A",
        "value": "A"
      },
      {
        "label": "B",
        "value": "B"
      },
      {
        "label": "C",
        "value": "C"
      }
    ]
  }
}
```

#### `require` : Boolean
入力が必須かどうかを設定できます。
`false` でかつ、 `validation` が有効の場合。
- フォームが空であれば `validation` を無視。
- フォームに値があれば `validation` が有効化。
初期値は `false` 。

#### `errorMsg` : Array
エラー時のメッセージを指定できます。
長さ2の配列を使用します。
- `errorMsg[0]` には `require` に合格しなかった場合のエラーメッセージ
- `errorMsg[1]` には `validation` に合格しなかった場合のエラーメッセージ
が表示されます。
初期値は `["入力されていません", "形式が違います"]` 。;

# Log出力
メールが万が一送信されなかった時のために
`public/api/mail/_inc_/logs` 以下にログが吐かれるようになっています。
デバッグモードの際は作成されません。
自動で削除されないため数年に一度ファイルを掃除してあげてください。
