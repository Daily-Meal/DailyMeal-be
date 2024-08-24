# Daily-Meal Backend

이 프로젝트는 TypeScript, Express.js, TypeORM을 사용하여 웹 API를 구축하는 Node.js 프로젝트입니다. 프로젝트는 컨트롤러, 서비스, 라우트, 엔티티로 구성되며, 유닛 테스트는 `__tests__` 디렉터리에 조직되어 있습니다.

## 목차
- [사용 기술](#사용-기술)
- [프로젝트 구조](#프로젝트-구조)

## 사용 기술
- **프로그래밍 언어**: TypeScript
- **런타임 환경**: Node.js
- **웹 프레임워크**: Express.js
- **라이브러리**: TypeORM, JWT, CORS
- **데이터베이스**: MariaDB
- **테스트 프레임워크**: Jest

## 프로젝트 구조

```bash
DailyMeal-be/
│
├── src/
│   ├── config/            # 구성 파일 (예: 환경 변수, 데이터베이스 설정)
│   ├── entity/            # TypeORM 엔티티 (데이터베이스 모델)
│   ├── controllers/       # Express.js 컨트롤러 (요청 처리 로직)
│   ├── middlewares/       # 커스텀 미들웨어 함수
│   ├── services/          # 비즈니스 로직 (서비스 계층)
│   ├── routes/            # Express.js 라우트 (API 경로 설정)
│   ├── utils/             # 유틸리티 함수 및 헬퍼들
│   ├── app.ts             # Express 애플리케이션 설정
│   └── server.ts          # 애플리케이션 서버 초기화 및 실행
│
├── __tests__/
│   ├── controllers/       # 컨트롤러 테스트
│   ├── services/          # 서비스 로직 테스트
│   ├── routes/            # 라우트 테스트
│   └── app.test.ts        # 애플리케이션 전체 테스트
│
├── tsconfig.json          # TypeScript 구성 파일
├── jest.config.js         # Jest 테스트 구성 파일
├── ormconfig.json         # TypeORM 구성 파일
└── package.json           # 프로젝트 메타데이터 및 종속성

