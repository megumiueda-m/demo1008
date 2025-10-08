        // 住所を取得して表示する関数
        function getAddressFromCoordinates(latitude, longitude) {
          // OpenStreetMap Nominatim APIのURL
          var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

          // APIにGETリクエストを送信
          fetch(url)
              .then(response => response.json())
              .then(data => {
                  // 住所を取得して表示
                var addr = data.address; // 分解された住所データ

                // 欲しい要素だけ取り出して並べる
                var postcode = addr.postcode || "";
                var state = addr.state || "";
                var city = addr.city || addr.town || addr.village || "";
                var ward = addr.suburb || "";
                var neighbourhood = addr.neighbourhood || "";
                var road = addr.road || "";


                // road に丁目が含まれている場合が多い（例：南1条西5）
                // neighbourhood や suburb も補助的に加える
                var formattedAddress = `${postcode}　${state}${city}${ward}${neighbourhood}${road}`;

                // 表示
                document.getElementById('addressDisplay').textContent = "住所：" + formattedAddress;

                // 札幌市が含まれるかチェック
                if (city.includes("札幌市")) {
                    document.getElementById('section_s').style.display = 'block';
                } else {
                    document.getElementById('section_s').style.display = 'none';
                }
                })
                .catch(error => {
                console.log("エラー:", error);
                });
      }

      // ボタンをクリックしたときの処理
      document.getElementById('getLocationBtn').addEventListener('click', function() {
          // ユーザーの位置情報を取得
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                  // 緯度と経度を取得
                  var latitude = position.coords.latitude;
                  var longitude = position.coords.longitude;
                  
                  // 取得した位置情報を逆ジオコーディングして住所に変換
                  getAddressFromCoordinates(latitude, longitude);
              }, function(error) {
                  console.log("位置情報の取得に失敗しました:", error);
              });
          } else {
              console.log("Geolocation がサポートされていません");
          }
      });