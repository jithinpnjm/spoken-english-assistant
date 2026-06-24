---
name: German Coach release check
about: Track the final German Coach release validation
labels: german-coach, release-check
---

# German Coach Release Check

## Build checks

- [ ] `cd english-coach`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run dev`

## Portal checks

- [ ] Login works
- [ ] Portal selector appears
- [ ] English Coach opens
- [ ] German Coach opens
- [ ] Return to portal works

## English regression

- [ ] English Live starts
- [ ] English teacher persona is unchanged
- [ ] Vocabulary live practice starts
- [ ] Stop Live works

## German Coach checks

- [ ] A0 level opens
- [ ] A1 level opens
- [ ] A2 level opens
- [ ] B1 level opens
- [ ] Exam Sections view works
- [ ] Ordered Path view works
- [ ] Study dashboard appears
- [ ] Mark selected topic done works
- [ ] Reset local state works

## German practice checks

- [ ] A0 practice works
- [ ] A1 practice works
- [ ] A2 repair tasks appear
- [ ] B1 repair tasks appear
- [ ] Corrected German appears for wrong answers
- [ ] Rewrite/repeat instruction appears

## Writing and mock checks

- [ ] A1 writing review works
- [ ] A2 writing review works
- [ ] B1 writing review works
- [ ] A1 mini mock works
- [ ] A2 mini mock works
- [ ] B1 mini mock works

## German Live checks

- [ ] German Live starts on A1
- [ ] German Live starts on A2
- [ ] German Live starts on B1
- [ ] Deutsch Coach persona is used
- [ ] Correction loop works
- [ ] Stop German Live works
- [ ] Changing level/section stops active live session

## Production environment checks

- [ ] HTTPS deployed URL works
- [ ] Mic permission works
- [ ] `/api/config` works
- [ ] `/api/audio-bridge` WebSocket works
- [ ] `/api/transcribe` works
- [ ] No console blocking errors
- [ ] Mobile layout checked

## Release decision

- [ ] All checks pass
- [ ] Known limitations documented
- [ ] Release label can be set to `German Coach v1.0`
