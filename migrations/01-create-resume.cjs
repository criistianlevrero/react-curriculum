// Adds the `resume` content type, a composition root that references the
// existing content blocks, plus a `replaces` field on every swappable block.
module.exports = function (migration) {
  const resume = migration
    .createContentType('resume')
    .name('Resume')
    .description('A CV. Empty block fields are inherited from "Based on"; "Replacements" swap single blocks.')
    .displayField('title')

  resume.createField('title').name('Title').type('Symbol').required(true)

  resume
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([
      { unique: true },
      { regexp: { pattern: '^[a-z0-9]+(-[a-z0-9]+)*$' }, message: 'Lowercase letters, numbers and dashes only' },
    ])

  resume.createField('isDefault').name('Is default').type('Boolean')

  resume
    .createField('basedOn')
    .name('Based on')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['resume'] }])

  resume
    .createField('personalData')
    .name('Personal data')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['personalData'] }])

  resume
    .createField('qualifications')
    .name('Qualifications')
    .type('Array')
    .items({ type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['qualifications'] }] })

  resume
    .createField('projects')
    .name('Projects')
    .type('Array')
    .items({ type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['project'] }] })

  resume
    .createField('replacements')
    .name('Replacements')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['personalData', 'qualifications', 'project'] }],
    })

  resume.changeFieldControl('isDefault', 'builtin', 'boolean', {
    helpText: 'Shown at the site root. Only one resume should have this enabled.',
  })
  resume.changeFieldControl('replacements', 'builtin', 'entryLinksEditor', {
    helpText: 'Variants whose "Replaces" field points at a block of the base resume.',
  })

  for (const contentTypeId of ['personalData', 'qualifications', 'project']) {
    const contentType = migration.editContentType(contentTypeId)
    contentType
      .createField('replaces')
      .name('Replaces')
      .type('Link')
      .linkType('Entry')
      .validations([{ linkContentType: [contentTypeId] }])
    contentType.changeFieldControl('replaces', 'builtin', 'entryLinkEditor', {
      helpText: 'Only for variants: the original entry this one replaces in a resume.',
    })
  }
}
