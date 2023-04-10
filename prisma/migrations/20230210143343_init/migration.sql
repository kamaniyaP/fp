-- CreateTable
CREATE TABLE "answers" (
    "submission_time" VARCHAR(30) NOT NULL,
    "user_id" VARCHAR(64) NOT NULL,
    "answer" TEXT,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("submission_time","user_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "submission_time" VARCHAR(30) NOT NULL,
    "user_id" VARCHAR(64) NOT NULL,
    "question" TEXT,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("submission_time","user_id")
);

-- CreateTable
CREATE TABLE "solutions" (
    "q_sub_time" VARCHAR(30) NOT NULL,
    "q_user_id" VARCHAR(64) NOT NULL,
    "a_sub_time" VARCHAR(30) NOT NULL,
    "a_user_id" VARCHAR(64) NOT NULL,

    CONSTRAINT "solutions_pkey" PRIMARY KEY ("q_sub_time","q_user_id","a_sub_time","a_user_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" VARCHAR(64) NOT NULL,
    "user_name" VARCHAR(256),
    "user_mail" VARCHAR(256),
    "user_password" VARCHAR(256),
    "user_rating" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "answers_user_id_submission_time_key" ON "answers"("user_id", "submission_time");

-- CreateIndex
CREATE UNIQUE INDEX "questions_user_id_submission_time_key" ON "questions"("user_id", "submission_time");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_mail_key" ON "users"("user_mail");

-- AddForeignKey
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_a_sub_time_a_user_id_fkey" FOREIGN KEY ("a_sub_time", "a_user_id") REFERENCES "answers"("submission_time", "user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_q_sub_time_q_user_id_fkey" FOREIGN KEY ("q_sub_time", "q_user_id") REFERENCES "questions"("submission_time", "user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
