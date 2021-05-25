let array = ret.data.course_syllabus;
var flags = [],
  unique_chapter = [],
  l = array.length,
  i;

for (i = 0; i < l; ++i) {
  if (flags[array[i].chap_id]) continue;
  flags[array[i].chap_id] = true;
  unique_chapter.push({
    chap_id: array[i].chap_id,
    chap_name: array[i].chap_name,
  });
}
console.log(unique_chapter);
