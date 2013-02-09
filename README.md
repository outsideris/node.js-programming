Node.js 프로그래밍 : 클라우드 컴퓨팅 시대의 고성능 자바스크립트 플랫폼
==========================

* [Node.js 프로그래밍](http://blog.outsider.ne.kr/738)의 예제 소스입니다.
    - [에이콘 출판사 소개](http://www.acornpub.co.kr/book/nodejs)
    - [Yes 24](http://www.yes24.com/24/goods/6271069)
    - [알라딘](http://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8960772763)
    - [강컴](http://kangcom.com/sub/view.asp?topid=5&sku=201202070001)
    - [인터파크](http://book.interpark.com/product/BookDisplay.do?_method=detail&sc.shopNo=0000400000&sc.prdNo=209853133&bookblockname=b_sch&booklinkname=bprd_title)
    - [교보문고](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788960772762)
* 이 예제는 Node.js v0.8.14 기반으로 작성되었습니다.
* 잘못된 부분을 발견하시면 이슈에 등록해 주세요.


## 기존 소스에 비해서 주요 변경사항

* node 0.8.x 호환성 맞춤
    * `path.exist` -> `fs.exist`
* npm 모듈 최신버전으로 갱신
    * restler 2.0.1로 업그래이드
    * express 3.1.x로 업그래이드
        * express 실행코드 변경
        * jade 템플릿을 레이아웃 방식에서 상속방식으로 변경
        * socket.io 연동객체 변경
    * socket.io 0.9.x으로 업그래이드 
    * clog 0.1.x로 업그래이드

* 주요 변경사항은 [커밋로그](https://github.com/outsideris/node.js-programming/commit/c0b42b349135b2ad5c85f8f3165bbeec99f6ffb1)에서 확인할 수 있습니다.

