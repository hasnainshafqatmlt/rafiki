
export function getDisposition(dp) {
	switch (dp) {
		case 'BUSINESS_ANGEL':
			return 'Business angel'
		case 'ENTREPRENEUR':
			return 'Entrepreneur'
		case 'VC':
			return 'VC'
		case 'ADVISOR':
			return 'Advisor'
		case 'CONTRIBUTOR':
			return 'Contributor'
		default:
			return ''
	}
}
